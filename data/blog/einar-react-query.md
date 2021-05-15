---
title: React Query
date: '2021-05-08'
tags: ['next js','guide' ,'react query']
draft: false
summary: 'Fetch, cache and update data in your React and React Native applications all without touching any "global state".'
images: ['/static/images/project/react-query.jpg']
---

## React Query

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |




React Query beskrivs ofta som det saknade datahämtningsbiblioteket (fetching library ) för React, men i mer tekniska termer gör det att **hämta, cacha, synkronisera och uppdatera servertillstånd** i dina React-applikationer till en lek.

![React-Query](/static/images/project/react-query.jpg)



## useQueryClient


[Weibenfalk YT](https://youtu.be/vulrysnm0xU)



The `useQueryClient` hook returns the current `QueryClient` instance.

```js
import { useQueryClient } from 'react-query'

const queryClient = useQueryClient()
```



```javascript
import {useQuery}   from 'react-query';
import './App.css';

const fetchUsers = async () => {
  const response = await fetch('https://reqres.in/api/users');
  if (!response.ok) {
    throw new Error('Something went wrong!');
  }
  return response.json();
};

function App() {

  //Grab all users
  const {data: usersdd, isLoading,error} = useQuery('users', fetchUsers)

    if (isLoading) return <p>Loading ... </p>
    if (error) return <p>Wrong!</p>

   
    // console.log(users);

  return (
    <div className="App">
 { usersdd.data.map(user => (
        <p key={user.id}>
          {user.first_name} {user.last_name} <br/> <strong>e-post: {user.email}</strong> </p>
 ))}
 </div>
  );
}

export default App;
```



## Mutationer (Mutations) 

Till skillnad från frågor (queries) används mutationer (mutations) vanligtvis för att skapa/uppdatera/tabort data eller utföra server sidoeffekter För detta ändamål exporterar **React Query** en `useMutation` hook.