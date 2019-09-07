const fs = require( "fs" )
const $path = require( "path" )
const crypto = require( 'crypto' )
// const copy2old = require('./n22/copy2old')

let dist = './dist'
let statSync = fs.statSync
let hashReg = /\.(\S*)\./
const manifestData = {}
let manifestData_old1 = {}
let manifestData_old2 = {}
const manifestFile = 'manifest.json'
const readHash = function ( src, ignore ) {

  let doBreak = false;
  let baseName = $path.basename( src );

  ignore.forEach( element => {
    if ( baseName == element ) {
      doBreak = true;
    }
  } );

  if ( doBreak ) {
    return null;
  }

  let paths = fs.readdirSync( src )

  paths.forEach( function ( path ) {
    var _src = src + '/' + path

    let st = statSync( _src )

    // 判断是否为文件
    if ( st.isFile() ) {
      console.log( '文件：', _src );
      let hashs = $path.basename( _src ).match( hashReg );

      //文件上有hash值
      let key = null;
      let value = null;
      if ( hashs ) {
        key = _src.replace( dist + '/', '' ).replace( '.' + hashs[ 1 ], '' )
        value = hashs[ 1 ];
      } else {
        try {
          let fileData = fs.readFileSync( _src );
          let hash = crypto.createHash( 'md5' );
          hash.update( fileData.toString(), 'utf8' );
          key = _src.replace( dist + '/', '' )
          value = hash.digest( 'hex' )
        } catch ( e ) {
          // fail silently.
        }
      }

      if ( key ) {
        manifestData[ key ] = value;

        //判断文件的hash是否一致
        if ( manifestData_old1[ key ] != value ) {
          var readable, writable;

          let _dst = _src.replace( dist, dist + '/diff/' )

          let dir = $path.dirname( _dst );
          mkdirs( dir )

          readable = fs.createReadStream( _src );
          // 创建写入流
          writable = fs.createWriteStream( _dst );
          // 通过管道来传输流
          readable.pipe( writable );
        }
      }

    }
    // 如果是目录则递归调用自身
    else if ( st.isDirectory() ) {
      readHash( _src, ignore );
    }
  } )
}

const diff = {
  diffFiles: function () {
    try {
      let data = fs.readFileSync( $path.join( dist, '/old/manifest.json' ), 'utf8' );
      if ( data ) {
        console.log( 'data->', data );

        manifestData_old1 = JSON.parse( data );
      }
    } catch ( x ) {
      console.log( '#####', x );
    }

    readHash( dist, [ 'old', 'diff' ] )

    manifestData.version = new Date().getTime();
    let manifest = JSON.stringify( manifestData, null, 2 );
    console.log( manifest );
    fs.writeFile( $path.join( dist, '/manifest.json' ), manifest )
  }
}

function mkdirs( dir ) {
  let flag = fs.existsSync( dir )
  if ( !flag ) {
    let parentDir = $path.dirname( dir );
    mkdirs( parentDir )
    fs.mkdirSync( dir );
  }
}

module.exports = diff
