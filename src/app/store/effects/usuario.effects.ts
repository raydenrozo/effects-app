import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuarioActions from '../actions/usuario.actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';



@Injectable()
export class UsuarioEffects {

    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
    ){}

    cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuarioActions.cargarUsuario ),
            //tap( data => console.log('effect  tap', data)),
            mergeMap(
                (action) => this.usuarioService.getUserById( action.id )
                    .pipe(
                        //tap( data => console.log('getUsers effects', data))
                        map( user => usuarioActions.cargarUsuarioSuccess({ usuario: user })),
                        catchError( err => of(usuarioActions.cargarUsuarioError({  payload: err })))
                    )
            )
        )
    );

//     cargarUsuario$ = createEffect(
//         () => this.actions$.pipe(
//             ofType( usuariosActions.cargarUsuario ),
//             mergeMap(
//                 ( action ) => this.usuarioService.getUserById( action.id )
//                     .pipe(
//                         map( user => usuariosActions.cargarUsuarioSuccess({ usuario: user }) ),
//                         catchError( err => of(usuariosActions.cargarUsuarioError({ payload: err })) )
//                     )
//             )
//         )
//     );

}