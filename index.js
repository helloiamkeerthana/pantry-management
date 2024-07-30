// pages/index.js
import { useEffect, useState } from 'react';
import firebase from '../firebaseConfig';
import { Container, List, ListItem, Button, TextField } from '@material-ui/core';

const Home = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('pantry').onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setItems(data);
        });
        return () => unsubscribe();
    }, []);

    const addItem = () => {
        firebase.firestore().collection('pantry').add({ name: newItem, quantity: 1 });
        setNewItem("");
    };

    return (
        <Container>
            <h1>Pantry Tracker</h1>
            <TextField value={newItem} onChange={e => setNewItem(e.target.value)} placeholder="New Item" />
            <Button onClick={addItem}>Add Item</Button>
            <List>
                {items.map(item => (
                    <ListItem key={item.id}>{item.name} - {item.quantity}</ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Home;
