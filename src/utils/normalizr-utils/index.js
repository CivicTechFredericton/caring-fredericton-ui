import { schema } from 'normalizr';
import { fromJS, Map, Set } from 'immutable';

export const selectEntities = entityName => reducer =>
  reducer.getIn(['entities', entityName], Map());

const mergeEntities = (state, newEntities, schemaKey) => {
  return state
    .updateIn(['entities'], Map(), items =>
      items.has(schemaKey) ? items : items.set(schemaKey, Map())
    )
    .updateIn(['entities'], Map(), entities =>
      entities
        .mergeDeep(newEntities)
        .update(schemaKey, items =>
          items.map((item, id) =>
            newEntities.hasIn([schemaKey, id])
              ? newEntities.getIn([schemaKey, id])
              : item
          )
        )
    );
};

const mergeResults = (state, key, result) => {
  return state.updateIn(['result', key], Set(), items => items.merge(result));
};

const determineSchemaKey = currentSchema => {
  // @TODO Extend this to support more schemas

  if (currentSchema instanceof schema.Array) {
    return currentSchema.schema.key;
  }

  if (Array.isArray(currentSchema)) {
    return currentSchema[0].key;
  }

  return currentSchema.key;
};

export const mergeNormalized = (state, action) => {
  const finalPayload = fromJS(action.payload);

  return mergeResults(
    mergeEntities(state, finalPayload.get('entities')),
    determineSchemaKey(action.meta.schema),
    finalPayload.get('result')
  );
};
