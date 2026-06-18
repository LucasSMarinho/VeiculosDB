'use client'

import '../app/Login.css'

import Logo from "@/public/vectra.svg"
import api from "@/services/services"
import { useContext } from "react"
import { useState, useEffect } from "react"
import { UsuarioContext } from "@/context/UsuarioContext"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/router"  
import Link from "next/link"
import Image from 'next/image'

const Home = () => {


    const [senha, setSenha] = useState("")
    const [email, setEmail] = useState("")
    const {token, setToken, usuario, setUsuario} = useContext(UsuarioContext)



    // Verificar token ao carregar a página
    useEffect(() => {
        const tokenStorage = localStorage.getItem("token")
        if (tokenStorage) {
            checarToken(tokenStorage)
        }
    }, [])

    
const checarToken = (token : any) => {
     if (!token || token.trim() === "") {
        return
    }

    const router = useRouter()

    try {
        const decodedToken = jwtDecode(token)
        setUsuario(decodedToken)  

        router.push("/veiculos")
    } catch (error) {
        console.log("Token inválido:", error)
        localStorage.removeItem("token")
    }
    }

    const funcEntrar = async () => {
        console.log("Email:", email);
        console.log("Senha:", senha);
     
        try
        {   
            const objLogin = {
                email: email,
                senha: senha
            }

            const response = await api.post('/Login', objLogin);
            const tokenObtido = response.data.token;
            
            console.log("Token recebido:", tokenObtido);
            setToken(tokenObtido);
            localStorage.setItem("token", tokenObtido);

            // checarToken(tokenObtido)

        } 
        catch (error) 
        {
            console.error("Erro ao fazer login:", error);
        }
    } 


    return(
        <main className="main_login">
          <div className={`banner`}></div>
          <section className={`section_login`}>
            <Image src={Logo} alt="Logo do Filmoteca" width={100} />
            <form action="" className="form_login">
                <h1>Login</h1>
                <div className="campos_login">
                    <div className="campo_input">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="campo_input">
                        <label htmlFor="senha">Senha:</label>
                        <input type="password" name="senha" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)}                     />
                    </div>
                </div>
                <button onClick={() => {funcEntrar()}}> Entrar </button>
                <Link className="link_perfil" href="/veiculos">  Não tem uma conta? Cadastre-se </Link>
                
            </form>
          </section>
        </main>
    )
}

export default Home