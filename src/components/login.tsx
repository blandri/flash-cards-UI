import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

interface loginProps{}

const LoginPage: React.FunctionComponent<loginProps>=():any=>{
    // const [formData,setFormData]=useState<{email:string,password:string,name: string}>()
    const [name,setName]= useState<string>()
    const [email,setEmail]= useState<string>()
    const [password,setPassword]= useState<string>()
    const navigate= useNavigate()
    const [formState,setFormState]= useState<string>()
    const [error,setError]= useState<string>()

    
        const token= localStorage.getItem("AUTH_TOKEN")

        useEffect(()=>{
            if(token){
                setFormState("login")
            }
            else {
                setFormState("signup")
            }
        },[token])
        
        
        const SIGN_UP= gql`
        mutation Signup($name: String!, $email: String!, $password: String!) {
            signup(name: $name, email: $email, password: $password) {
              token
              user {
                id
                name
                email
              }
            }
          }
        `

        const LOGIN= gql`
        mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              token
              user {
                id
                name
                email
              }
            }
          }
        `

        const [signup] = useMutation(SIGN_UP, {
            variables: {
              name: name,
              email: email,
              password: password
            },
            onError: ({graphQLErrors,networkError})=>{
                if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      setError(message)
    );
    if (networkError) console.log(`[Network error]: ${networkError}`);
            },
            onCompleted: ({ signup }) => {
                console.log(signup)
              localStorage.setItem("AUTH_TOKEN", JSON.stringify({
                id: signup.user.id,
                token: signup.token
              }));
              navigate('/home');
            }
          });

          const [login] = useMutation(LOGIN, {
            variables: {
              email: email,
              password: password
            },
            onError: ({graphQLErrors,networkError})=>{
                if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      setError(message)
    );
    if (networkError) console.log(`[Network error]: ${networkError}`);
            },
            onCompleted: ({ login }) => {
                console.log(login)
              localStorage.setItem("AUTH_TOKEN",  JSON.stringify({
                id: login.user.id,
                token: login.token
              }));
              navigate('/home');
            }
          });

    return (
        <Container style={{
            display: "flex",
            justifyContent: "center"
        }}>
        <Form onSubmit={formState==="signup"?(e)=>{e.preventDefault(); signup()}:
        (e)=>{e.preventDefault(); login()}
    } style={{
            width: "30%",
            marginTop: "10%",
            backgroundColor: "#CFCACA",
            padding: "15px"
        }}>
            {formState==="signup"? <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Name</Form.Label>
            <Form.Control type="Name" placeholder="Name" onChange={e=>setName(e.target.value)}/>
        </Form.Group>:null}
           
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={e=>setEmail(e.target.value)}/>
          </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
        </Form.Group>
        <span style={{color:"red",fontWeight:"bold",position:"absolute"}}>{error}</span>
        <Form.Group className="mb-3" controlId="formBasicCheckbox" style={{
            marginTop:"50px"
        }}>
            <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <div style={{display:"flex"}}>
        <Button variant="primary" type="submit">
            {
                formState==="signup"?"signup":"login"
            }
        </Button>
        <Form.Text onClick={formState==="signup"?e=>setFormState("login"):e=>setFormState("signup")} style={{
            marginLeft:"20px", cursor:"pointer",color:"#4973FC",
            fontWeight: "300",
            textDecoration: "underlined"
            }}>
            {
                formState==="signup"?" Login instead":"Create an account"
            }
            </Form.Text>
        </div>
        
        </Form>
        </Container>
    )
}

export default LoginPage