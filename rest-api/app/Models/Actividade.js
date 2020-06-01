'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Actividade extends Model {
	tarea () {
    return this.belongsTo('App/Models/Tarea')
  }
}

module.exports = Actividade
