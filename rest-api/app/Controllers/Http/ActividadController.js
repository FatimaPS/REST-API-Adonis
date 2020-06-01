'use strict'

const Tarea = use('App/Models/Tarea');
const Proyecto = use('App/Models/Proyecto');
const Actividades = use('App/Models/Actividade');
const AutorizacionService = use('App/Services/AutorizacionService');

class ActividadController {
  async index({ auth, request, params}) {
    const user = await auth.getUser();
    const { id } = params;
    const tarea = await Tarea.find(id);
    //const proyecto = await Proyecto.find(id);
    AutorizacionService.verificarPermiso(tarea, proyecto);
    return await tarea.actividades().fetch();
  }

  async create({ auth, request, params}) {
    const user = await auth.getUser();
    const { descripcion, fechaInicio, fechaFin, prioridad } = request.all();
    const { id } = params;
    const proyecto = await Proyecto.find(id);
    AutorizacionService.verificarPermiso(proyecto, user);
    const tarea = new Tarea();
    tarea.fill({
      descripcion,
      fechaInicio,
      fechaFin,
      prioridad
    });
    await proyecto.tareas().save(tarea);
    return tarea;
  }

  async update({ auth, params, request}) {
    const user = await auth.getUser();
    const { id } = params;
    const tarea = await Tarea.find(id);
    const proyecto = await tarea.proyecto().fetch();
    AutorizacionService.verificarPermiso(proyecto, user);
    tarea.merge(request.only([
      'descripcion',
      'fechaInicio',
      'fechaFin',
      'prioridad',
      'completada'
    ]))
    await tarea.save();
    return tarea;
  }

  async destroy({ auth, params}) {
    const user = await auth.getUser();
    const { id } = params;
    const tarea = await Tarea.find(id);
    const proyecto = await tarea.proyecto().fetch();
    AutorizacionService.verificarPermiso(proyecto, user);
    await tarea.delete();
    return tarea;
  }
}
module.exports = ActividadController
