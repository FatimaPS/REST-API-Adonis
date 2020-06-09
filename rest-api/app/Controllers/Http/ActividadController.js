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
    const proyecto = await tarea.proyecto().fetch();
    AutorizacionService.verificarPermiso(proyecto, user);
    return await tarea.actividades().fetch();
  }

  async create({ auth, request, params}) {
    const user = await auth.getUser();
    const { nombre, descripcion, fechaInicio, fechaFin } = request.all();
    const { id } = params;
    const tarea = await Tarea.find(id);
    const proyecto = await tarea.proyecto().fetch();
    AutorizacionService.verificarPermiso(proyecto, user);
    const actividad = new Actividades();
    actividad.fill({
      nombre,
      descripcion,
      fechaInicio,
      fechaFin
    });
    await tarea.actividades().save(actividad);
    return actividad;
  }

  async update({ auth, params, request}) {
    const user = await auth.getUser();
    const { tid, id } = params;
    const actividad = await Actividades.find(id);
    const tarea = await Tarea.find(tid);
    const proyecto = await tarea.proyecto().fetch();
    AutorizacionService.verificarPermiso(proyecto, user);
    actividad.merge(request.only([
      'nombre',
      'descripcion',
      'fechaInicio',
      'fechaFin'
    ]))
    await actividad.save();
    return actividad;
  }

  async destroy({ auth, params}) {
    const user = await auth.getUser();
    const { tid, id } = params;
    const actividad = await Actividades.find(id);
    const tarea = await Tarea.find(tid);
    const proyecto = await tarea.proyecto().fetch();
    AutorizacionService.verificarPermiso(proyecto, user);
    await actividad.delete();
    return actividad;
  }
}
module.exports = ActividadController
