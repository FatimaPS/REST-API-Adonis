'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tarea extends Model {
  proyecto() {
    return this.belongsTo('App/Models/Proyecto')
  }

  actividades() {
    return this.hasMany('App/Models/Actividade')
  }
}

module.exports = Tarea
