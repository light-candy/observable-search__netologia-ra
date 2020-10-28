import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map,
         tap,
         debounceTime,
         switchMap,
         catchError } from 'rxjs/operators';
import { CHANGE_SEARCH_FIELD,
         SEARCH_SKILLS_REQUEST
       } from '../actions/actionTypes';
import { clearSearch,
         searchSkillsRequest,
         searchSkillsSuccess,
         searchSkillsFailure
       } from '../actions/actionCreators';

export const changeSearchEpic = action$ => action$.pipe(
    ofType(CHANGE_SEARCH_FIELD),
    map(o => o.payload.search.trim()),
    debounceTime(100),
    map(o => searchSkillsRequest(o)),
);

export const searchSkillsEpic = action$ => action$.pipe(
    ofType(SEARCH_SKILLS_REQUEST),
    map(o => o.payload.search),
    map(o => o !== '' ? o : clearSearch()),
    map(o => new URLSearchParams({ q: o })),
    switchMap(o =>  ajax.getJSON(`http://localhost:7070/api/search/?${o}`).pipe(
    map(o => searchSkillsSuccess(o)),
    catchError(e => of(searchSkillsFailure(e)))
    ))
);
