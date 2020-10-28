import {
    SEARCH_SKILLS_REQUEST,
    SEARCH_SKILLS_SUCCESS,
    SEARCH_SKILLS_FAILURE,
    CHANGE_SEARCH_FIELD,
    CLEAR_SEARCH
} from '../actions/actionTypes';

const initialState = {
    items: [],
    loading: false,
    error: null,
    search:''
};

export function skillsReducer(state = initialState, action) {
    switch(action.type){
        case SEARCH_SKILLS_REQUEST:
          return { ...state, items: [], loading:true, error:null };
        case SEARCH_SKILLS_SUCCESS:
          const { items } = action.payload;
          return { ...state, items, loading:false, error:null };
        case SEARCH_SKILLS_FAILURE:
          const { error } = action.payload;
          return { ...state, items: [], loading:false, error };
        case CHANGE_SEARCH_FIELD:
          const { search } = action.payload;
          return { ...state, search };
        case CLEAR_SEARCH:
        return { ...state, items:[], loading:false, error:null };
        default:
          return state;
    }
};
