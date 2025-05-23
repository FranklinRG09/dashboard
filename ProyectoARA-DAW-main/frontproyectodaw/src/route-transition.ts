import {
    trigger,
    transition,
    style,
    query,
    animate,
    group
  } from '@angular/animations';
  
  export const routeTransitionAnimations = trigger('routeTransition', [
    transition('* <=> *', [
      // Preparar ambos elementos con posición absoluta
      query(':enter, :leave', [
        style({
          position: 'absolute',
          width: '100%',
          top: 0,
          left: 0
        })
      ], { optional: true }),
  
      // Estado inicial del componente que entra (fuera de pantalla a la derecha)
      query(':enter', [
        style({
          transform: 'translateX(100%)',
          opacity: 0
        })
      ], { optional: true }),
  
      // Animar ambos: el que sale y el que entra
      group([
        query(':leave', [
          animate('300ms ease', style({
            transform: 'translateX(-100%)',
            opacity: 0
          }))
        ], { optional: true }),
  
        query(':enter', [
          animate('300ms ease', style({
            transform: 'translateX(0)',
            opacity: 1
          }))
        ], { optional: true })
      ])
    ])
  ]);
  