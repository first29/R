import { useState } from "react";

/*const tasksData = [
    {
        'IdTarea': 0,
        'Nombre_Tarea': "Tarea 1",
        'Prioridad': 3,
        'IdResponsable': 1,
        'IdProyecto': 1,
        'mapa': { latitude: -12.061036, longitude: -77.105172 },
        'radio': 25,
        'phases': [
            { id: 1, numero: 11, title: "Fase 1", 'status': "iniciado", startTime: null, endTime: null },
            { id: 2, numero: 12, title: "Fase 2", 'status': "pendiente", startTime: null, endTime: null },
            { id: 3, numero: 13, title: "Fase 3", 'status': "pendiente", startTime: null, endTime: null },
            { id: 4, numero: 14, title: "Fase 4", 'status': "pendiente", startTime: null, endTime: null },
        ],
    },
    {
        'IdTarea': 1,
        'Nombre_Tarea': "Tarea 2",
        'Prioridad': 3,
        'IdResponsable': 1,
        'IdProyecto': 1,
        'mapa': { latitude: -12.038253668166629, longitude: -77.0630332748678 },
        'radio': 5,
        'phases': [
            { id: "5", numero: 21,title: "Fase 1", 'status': "iniciado", startTime: null, endTime: null },
            { id: "6", numero: 22,title: "Fase 2", 'status': "pendiente", startTime: null, endTime: null },
            { id: "7", numero: 23,title: "Fase 3", 'status': "pendiente", startTime: null, endTime: null },
            { id: "8", numero: 24,title: "Fase 4", 'status': "pendiente", startTime: null, endTime: null },
        ],
    }, 
    {
        'IdTarea': 3,
        'Nombre_Tarea': "Tarea 3",
        'Prioridad': 3,
        'IdResponsable': 1,
        'IdProyecto': 1,
        'mapa': { latitude: -12.055791803451774, longitude:  -77.10212462528807 },
        'radio': 25,
        'phases': [
            { id: 1, title: "Fase 1", numero: 31, 'status': "iniciado", startTime: null, endTime: null },
            { id: 2, title: "Fase 2", numero: 32, 'status': "pendiente", startTime: null, endTime: null },
            { id: 3, title: "Fase 3", numero: 33, 'status': "pendiente", startTime: null, endTime: null },
            { id: 4, title: "Fase 4", numero: 34, 'status': "pendiente", startTime: null, endTime: null },
        ],
    },
    {
        'IdTarea': 4,
        'Nombre_Tarea': "Tarea 4",
        'Prioridad': 3,
        'IdResponsable': 1,
        'IdProyecto': 1,
        'mapa': { latitude: -12.060984194312718, longitude: -77.10500031389643 },
        'radio': 32,
        'phases': [
            { id: 1, title: "Fase 1", numero: 31, 'status': "iniciado", startTime: null, endTime: null },
            { id: 2, title: "Fase 2", numero: 32, 'status': "pendiente", startTime: null, endTime: null },
            { id: 3, title: "Fase 3", numero: 33, 'status': "pendiente", startTime: null, endTime: null },
            { id: 4, title: "Fase 4", numero: 34, 'status': "pendiente", startTime: null, endTime: null },
        ],
    },
    {
        'IdTarea': 5,
        'Nombre_Tarea': "Tarea 5",
        'Prioridad': 3,
        'IdResponsable': 1,
        'IdProyecto': 1,
        'mapa': { latitude: -12.061036, longitude: -77.105172 },
        'radio': 25,
        'phases': [
            { id: 1, title: "Fase 1", numero: 31, 'status': "iniciado", startTime: null, endTime: null },
            { id: 2, title: "Fase 2", numero: 32, 'status': "pendiente", startTime: null, endTime: null },
            { id: 3, title: "Fase 3", numero: 33, 'status': "pendiente", startTime: null, endTime: null },
            { id: 4, title: "Fase 4", numero: 34, 'status': "pendiente", startTime: null, endTime: null },
        ],
    }
];



export default fetchData;*/