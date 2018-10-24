### What is Story Booking?
Story booking allows you develop components without the need to run
the entire project. This lets you focus on building smaller pieces of
your application without the need to hook up data, actions, etc. Story booking
is where you should begin the majority of your new components

To start a new story; you will either need to:
1. Locate the existing storybook folder for the components

2. Create a folder under `stories` with the component's name, containing an index.jsx file.
You can use an existing story as a template.

### How do I Write Unit Tests?
The easiest way to write a unit test to copy and paste an existing
test file; stripping out any component specific logic. Unit tests
should focus on testing your "presentational" components; not the
integration points between your data and the component. Your team /
dev lead should be able to point you in the direction of
a developer who can assist you if you run into any problems.

### Should I create a new reducer for X?
It's impossible to give a blanket answer to this question. It is
recommended you stick to one reducer per data source; and you should
always ensure you are not duplicating data across multiple reducers;
and especially not in the same reducer. The usage of tools like `normalizr`,
`redux-actions`, and `reselect` will help you expose your data to multiple
components in a reusable manner.

### Should I connect component X to redux state?
Again; its impossible to give a blanket answer. By not connecting a component
to redux state; you simplify the components job. This makes it easier to test
and reuse throughout the application. However; if you have to jump through hoops
to get a value passed down to a single component, its better to bite the bullet
and connect the component.

### Handling Asynchronous Actions
Asynchronous actions are the backbone of most web applications. They include
things such as getting information from an API; performing long
running operations, or side affects from previous actions. We have
standardized on `redux-saga` to manage our asynchronous actions. Sagas can
be fairly complex; but we've included helpers in this
project which will simplify them for the general use cases. You can
find examples in the `src/examples/reddit-api-redux/sagas.js` file.

### Handling Data
One of the easiest ways to get tripped up developing a react/redux application
is by placing all your data in a store without considering how you will access
and interact with it. We have standardized on using `normalizr` and some helpers
(defined in `src/utils/normalizr-utils`) to simplify this process.

The long and the short of it is that most data will be stored in the following
structure:

```
{
  "entities": {
    "entity_type": {
      "record_id": {
        "id": "record_id",
        "other": "fields"
      }
    }
  },
  "results": {
    "entity_type": [
      "record_id"
    ]
  }
}
```

This division of entities by type; and keying results by their id; makes it
trivial to query our data and get the records we need.

### Accessing Data
We have standardized on using selectors (generally created with `reselect`)
to access our data. This allows the accessors of data to be oblivious the
underlying structure. You can find examples in `src/examples/reddit-api-redux/selectors.js`;
as well as `src/examples/subreddit/selectors.js`

### Why Use Immutable Data?
All data stored in this application should be stored as immutable objects (via `ImmutableJS`).
This is done for many reasons; including

1. Performance; immutable data is quick to compare
2. Simplification; stops us from changing our data from underneath our feet
3. "Free" helpers; `ImmutableJS` comes pre-equipped with `lodash` style helpers

### Handling Forms
Forms should be built exclusively using `redux-form`; it will
provide a plethora of helper functions that will greatly simplify
that part of your application. When working with redux-form, you
should have one (and exactly) one component that represents your
form input; which, based on a property (such as `type`), will render
the appropriate input type.

#### Handling Asynchronous Form Actions
Unfortunately; `redux-form` is pretty bad at handling Sagas. For
this reason; we have brought in a shim project called
`redux-routines` which mediates the interactions between forms and
sagas to ensure you can use the built-in `redux-form` facilities for
async validation and error handling.

### "Magic" File Names
This project uses "magic" file names to simplify the creation of
common application elements such as sagas and reducers. Any file
that contains the text `reducer.js` or `saga.js` will be included
in application bootstrapping.

### Performance
This project currently relies on the `amazon-cognito-identity-js` library; which
adds a fairly hefty amount of overhead. If you are required to have support for
mobile devices; you should vet performance with your client before hand. This is
only a concern of first time load; as the JS will be cached for subsequent reloads;
and even if app code is changed the vendor / aws dependenies will not need be
rebuilt.

### Third-Party Libraries
Be careful when adding new dependencies to the project. Mixing licenses can
result in projects becoming undeliverable. All dependencies should be vetted by
the team before they are merged.

**A quick check list of allowed licenses:**

- MIT
- ISC
- BSD
- Apache2
- Public Domain

Additionally; ensure that your third-party dependencies aren't duping existing
imported libs. Bundle size is something you should be aware of. Always try to
keep your bundle sizes small as it will result in faster load times for clients.
Finally, make sure you are using the explicit version match (no prefix); or the
patch version (~) match. NEVER use the minor version match (^) as you could
introduce breaking changes as dependencies update.
