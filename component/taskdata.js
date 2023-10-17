const tasksData = [
    {
        'IdTarea': 0,
        'Nombre_Tarea': "Tarea 1",
        'Prioridad': 3,
        'IdResponsable': 1,
        'IdProyecto': 1,
        'mapa': { latitude: -12.061036, longitude: -77.105172 },
        'radio': 25,
        'phases': [
          { id: 1, title: "Fase 1", status: "iniciado", startTime: null, endTime: null },
          { id: 2, title: "Fase 2", status: "pendiente", startTime: null, endTime: null },
          { id: 3, title: "Fase 3", status: "pendiente", startTime: null, endTime: null },
          { id: 4, title: "Fase 4", status: "pendiente", startTime: null, endTime: null },
        ],
      },
      {
        'id': "1",
        'title': "Tarea 2",
        'location': { latitude: -12.038253668166629, longitude: -77.0630332748678 },
        'radius': 5,
        'phases': [
          { id: "5", title: "Fase 1", status: "iniciado", startTime: null, endTime: null },
          { id: "6", title: "Fase 2", status: "pendiente", startTime: null, endTime: null },
          { id: "7", title: "Fase 3", status: "pendiente", startTime: null, endTime: null },
          { id: "8", title: "Fase 4", status: "pendiente", startTime: null, endTime: null },
        ],
      },
];
export default tasksData;