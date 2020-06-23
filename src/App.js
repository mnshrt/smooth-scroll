import React from 'react';
import './App.css';
import Item from './components/item.component';
import getList from './data/utility';

//Action Types
const types = {
  start: "START",
  loaded: "LOADED"
};

//Reducer to update the state based on action
const reducer = (state, action) => {
  switch (action.type) {
    case types.start:
      return { ...state, loading: true };
    case types.loaded:
      return {
        ...state,
        loading: false,
        data: [...action.newData],
      };
    default:
      throw new Error("Don't understand action");
  }
};

// defining the context to make the state available to the child elements
export const MyContext = React.createContext();


function MyProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    loading: false,
    data: []
  });
  const { loading, data } = state;

  // updating the list on scrolldown
  const load = () => {
    dispatch({ type: types.start });

    setTimeout(() => {
      const newData = getList(new Date());
      dispatch({ type: types.loaded, newData });
    }, 300);
  };

  return (
    <MyContext.Provider value={{ loading, data, load }}>
      {children}
    </MyContext.Provider>
  );
}


function App() {

  const { data, loading, load } = React.useContext(MyContext);
  const loader = React.useRef(load);
  const observer = React.useRef(
    new IntersectionObserver(
      entries => {
        const first = entries[0];
        if (first.isIntersecting) {
          loader.current();
        }
      },
      { threshold: 1 }
    )
  );
  const [element, setElement] = React.useState(null);

  React.useEffect(() => {
    loader.current = load;
  }, [load]);

  // update the component on scroll down
  React.useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);


  return (
    <div className="App">
    <ul>
      {[...data.entries()].map(entry => (
        <Item key={entry[0]} itemData={entry[1]}/>
      ))}

      {loading && <li style={{ background: "transparent" }}>Loading...</li>}

    
      {
      //flag for updating the list. once it is fully loaded it triggers the loading action  
      !loading && (
        <li ref={setElement} style={{ background: "transparent" }}></li>
      )}
    </ul>
  </div>
  );
}

export default ()=>{
    return  (
        <MyProvider>
          <App/>
        </MyProvider>
    );
};
