import './index.scss';
import './style-320.scss';
import './style-400.scss';
import './style-561.scss';
import './style-602.scss';
import './style-800.scss';
import './style-1020.scss';
import { Helmet } from 'react-helmet';
import storage from 'local-storage'
import { login } from '../../api/usuarioApi.js'
import LoadingBar from 'react-top-loading-bar'
import{Link} from 'react-router-dom'
import { useState, useRef, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

export default function Login() {

    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);

    const navigate = useNavigate();
    const ref = useRef();

    useEffect(() => {
        if(storage('usuario-logado')){
            navigate('/admin')
        }
    }, [])

    async function entrarClick(){
        ref.current.continuousStart();
        setCarregando(true);

        try{
        const r = await login(cpf, senha);
        storage('usuario-logado', r)

        setTimeout(() => {
            
            navigate('/Admin');
        }, 1500)
        ref.current.complete();
        

    } catch(err){
        ref.current.complete();
        setCarregando(false);
        if(err.response.status === 401){
            setErro(err.response.data.erro)
        }
    }
    }

    function mostrarOcultarSenha(){
        const senha = document.getElementById("senha");
        if(senha.type==="password")
            senha.type = "text";
        
        else 
        senha.type = "password"
    }


    

    return(    
    <body className='bd-login'>
        <LoadingBar color='#f11946' ref={ref} />
        <Helmet title='Login'/>
   
        <main className="page1">
            <Link to="/landing-page">
            <img className="logo" src="../images/Dental_Hioki__1_-removebg-preview.png"/>
            </Link>

            <section className="login"> 
                <div className="txt1">
                    CPF
                    </div>
                <div>
                    <input className="cx1" type="text" placeholder='Insira seu CPF' value={cpf} onChange={e => setCpf(e.target.value)}/>
                </div>

                <div className="txt2" >
                    Senha
                    </div>
                <div>
                    <input className="cx2" type="password" placeholder='Insira sua Senha' id='senha' value={senha} onChange={e => setSenha(e.target.value)} />
                    <input className='cxconfirma' type="checkbox" onClick={mostrarOcultarSenha}></input>
                    </div>
            
                <br/>

                <button className="botao"  onClick={entrarClick} disabled={carregando}> Entrar </button>
                
                <br/>

                <div className='invalido'>
                    {erro}
                </div>
                

            </section>

        </main>
    
    </body>
    )
}