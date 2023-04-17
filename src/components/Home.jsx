import {  collection, addDoc,getDoc, doc, setDoc, getDocs, Timestamp, arrayUnion, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react'
import {MDBTable, MDBTableHead, MDBTableBody}  from "mdb-react-ui-kit";


export default function Home () {
    const [user,setUser]  = useState([])
    const [loading,setLoading] = useState(true)
    let arrayUser = []
    const addUser = async () => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
        first: "Alan",
        middle: "Mathison",
        last: "Turing",
        born: 1912,
        national: "Viet Nam"
        });
    console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding user: ", e)
    }}

    // const addCity = async () => {
    // try {
    //     const citiesRef = collection(db, "cities");
    //     await setDoc(doc(citiesRef, "SF"), {
    //         name: "San Francisco", state: "CA", country: "USA",
    //         capital: false, population: 860000,
    //         regions: ["west_coast", "norcal"] });
    //     await setDoc(doc(citiesRef, "LA"), {
    //         name: "Los Angeles", state: "CA", country: "USA",
    //         capital: false, population: 3900000,
    //         regions: ["west_coast", "socal"] });
    //     await setDoc(doc(citiesRef, "DC"), {
    //         name: "Washington, D.C.", state: null, country: "USA",
    //         capital: true, population: 680000,
    //         regions: ["east_coast"] });
    //     await setDoc(doc(citiesRef, "TOK"), {
    //         name: "Tokyo", state: null, country: "Japan",
    //         capital: true, population: 9000000,
    //         regions: ["kanto", "honshu"] });
    //     await setDoc(doc(citiesRef, "BJ"), {
    //         name: "Beijing", state: null, country: "China",
    //         capital: true, population: 21500000,
    //         regions: ["jingjinji", "hebei"] });
    //     console.log("Document written with ID: ", citiesRef.id);
    //     } catch (e) {
    //         console.error("Error adding city: ", e)
    //     }}

    const getUser = async () => {
    const docRef = doc(db,"users/Ee4wEaBfNQdKXoLAwNqd")
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
    }

    const getAllUser = async () => {
    const docRef = collection(db,"users")
    await getDocs(docRef).then(snap=>{
        var data =[];
        snap.docs.map(doc=>{
            data.push(doc.data())
        })
        setUser(data)
    })
    setLoading(false)
    }

    const getCity = async () => {
    const docRef = doc(db, "cities", "SF");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
    }

    const addData = async () => {
    const docData = {
        stringExample: "Hello world!",
        booleanExample: true,
        numberExample: 3.14159265,
        dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
        arrayExample: [5, true, "hello"],
        nullExample: null,
        objectExample: {
            a: 5,
            b: {
                nested: "foo"
            }
        }
    };
    await setDoc(doc(db, "data", "one"), docData);
    }


    const removeCity = async () => {
        const washingtonRef = doc(db, "cities", "DC");
    // Atomically add a new region to the "regions" array field.
    await updateDoc(washingtonRef, {
        regions: arrayUnion("greater_virginia")
    });

    // Atomically remove a region from the "regions" array field.
    // await updateDoc(washingtonRef, {
    //     regions: arrayRemove("east_coast")
    // });
    }
    useEffect(()=>{
    getUser();
    getCity();
    getAllUser();
    addData();
    removeCity();
    },[])

        return(
            <>
                <div className="App">
                <div className="card">
                <button onClick={() => {addUser()}}>
                    Click add User
                </button>
                </div>
                <div className="card">
                <button onClick={() => {addCity()}}>
                    Click add City Infor
                </button>
                </div>
                <p className="read-the-docs">
                Click on the Firebase and React teams to learn more
                </p>
                </div>
                <MDBTable>
                    <MDBTableHead>
                    <tr>
                        <th scope='col'>STT</th>
                        <th scope='col'>Middle</th>
                        <th scope='col'>National</th>
                        <th scope='col'>Last</th>
                        <th scope='col'>First</th>
                        <th scope='col'>Born</th>
                    </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                    {loading? <h3>Loading...</h3> :
                      user && user.map((u,index)=>{
                        <tr>
                            <td scope='row'>{index}</td>
                            <td scope='row'>{u.middle}</td>
                            <td scope='row'>{u.national}</td>
                            <td scope='row'>{u.last}</td>
                            <td scope='row'>{u.first}</td>
                            <td scope='row'>{u.born}</td>
                        </tr>
                       }
                       )
                    }
                    </MDBTableBody>
                </MDBTable>
            </>
        )
}