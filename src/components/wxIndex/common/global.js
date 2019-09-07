import Vue from "vue"

function ChangeStr (str) {
  return str.charAt(0).toUpperCase()+str.slice(1)
}

const requireComponents = require.context(".",false,/\.vue$/);

requireComponents.keys().forEach(filename => {
    const config = requireComponents(filename)
    const componentName = ChangeStr(
        filename.replace(/^\.\//,"").replace(/\.\w+$/,"")
    )
    Vue.component(componentName,config.default||config)
});