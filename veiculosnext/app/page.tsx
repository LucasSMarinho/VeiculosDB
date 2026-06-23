'use client'

import '../app/Login.css'

import Logo from "@/public/vectra.svg"
import api from "@/services/services"
import { useContext } from "react"
import { useState, useEffect } from "react"
import { UsuarioContext } from "@/context/UsuarioContext"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation"
import imagemEmail from '@/public/imagemEmail.svg'
import imagemSenha from '@/public/imagemSenha.svg'
import Link from "next/link"
import Image from 'next/image'

const Home = () => {

    const router = useRouter()
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

    

    try {
        const decodedToken = jwtDecode(token)
        setUsuario(decodedToken)  
        console.log(usuario)

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
            
            document.cookie = `auth_token=${tokenObtido}; path=/`;
            setToken(tokenObtido);
            localStorage.setItem("token", tokenObtido);

            checarToken(tokenObtido)

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
            <Image src={Logo} alt="Logo do Filmoteca" width={300} />
            <form action="" className="form_login">
                <div className='texto_login'>
                <hr /><h1>Login</h1><hr />
                </div>
                <div className="campos_login">
                    <div className="campo_input">
                        <label htmlFor="email">E-mail</label>
                        <div>
                        <Image src={imagemEmail} alt="imagem email" width={35}/>
                        <input type="email" name="email" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className="campo_input">
                        <label htmlFor="senha">Senha</label>
                        <div>
                        <Image src={imagemSenha} alt="imagem senha" width={35}/>
                        <input type="password" name="senha" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)}  />
                        </div>
                    </div>
                </div>
                <button className='botao_login' type="button" onClick={() => {funcEntrar()}}> Entrar </button>
                <Link className="link_perfil" href="/telaCadastrar">  Não tem uma conta? <strong>Cadastre-se</strong> </Link>
                
            </form>
          </section>
        </main>
    )
}

export default Home