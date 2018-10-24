import { put, takeLatest } from 'redux-saga/effects';
import { List } from 'immutable';
import { createRoutine as rsrCreateRoutine } from 'redux-saga-routines';
import stages from 'redux-saga-routines/dist/routineStages';

export const takeLatestRoutine = (routine, handler) => {
  return takeLatest(routine.TRIGGER, function* (action) {
    try {
      yield put(routine.request());

      const result = yield handler(action);

      yield put(routine.success(result));

    } catch (e) {

      yield put(routine.failure(e));
    }

    yield put(routine.fulfill());
  });
};

export const createRoutine = (props) => {
  const { name, metaCreator, payloadCreator } = typeof(props) === 'string' ?
    { name: props } :
    props;

  const routine = rsrCreateRoutine(name, payloadCreator);

  return Object.assign(routine, {
    ...routine,
    ...List(stages).toMap().mapKeys((_, item) => item.toLowerCase()).map(stage => {
      const stageName = stage.toLowerCase();
      const stageAction = routine[stageName];

      // only want to give the meta to the success action
      if(!metaCreator || stageName !== 'success') {
        return stageAction;
      }

      return (payload) => {
        const meta = typeof(metaCreator) === 'function' ?
          metaCreator(payload) :
          metaCreator;

        const action = stageAction(payload);

        return {
          ...action,
          meta
        };
      }
    }).toJS()
  });
};
