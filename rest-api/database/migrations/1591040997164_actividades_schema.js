'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActividadesSchema extends Schema {
  up () {
    this.create('actividades', (table) => {
      table.increments()
      table.integer('tarea_id').unsigned().references('id').inTable('tareas')
      table.string('nombre', 50).notNullable()
      table.string('descripcion', 255)
      table.date('fechaInicio')
      table.date('fechaFin')
      table.timestamps()
    })
  }

  down () {
    this.drop('actividades')
  }
}

module.exports = ActividadesSchema
