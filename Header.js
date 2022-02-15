import {useEffect, useState} from 'react';
import {auth} from './firebase';



function Header(props){
    
    useEffect(()=>{
       
    }, [])
    

    //Criar conta firebase
    function criarConta(e){

      e.preventDefault();
      let email = document.getElementById('email-cadastro').value;
      let username = document.getElementById('username-cadastro').value;
      let senha = document.getElementById('senha-cadastro').value;

      auth.createUserWithEmailAndPassword(email,senha)
      .then((authUser)=>{
        authUser.user.updateProfile({
          displayName: username
        })

        alert('Conta criada com sucesso!');
        let modal = document.querySelector('.modalCriarConta');

        modal.style.display = "none";

      }).catch((error)=>{
        alert(error.message);
      })

    }

    //login
    function logar(e){
        e.preventDefault();
        let email = document.getElementById('email-login').value;
        let senha = document.getElementById('senha-login').value;

        auth.signInWithEmailAndPassword(email,senha)
        .then((auth)=>{
          props.setUser(auth.user.displayName);
        }).catch((error)=>{
          alert(error.message);
        })

    }
    
    //janela de criação de conta
    function abrirModalCriarConta(e){
        e.preventDefault();

      let modal = document.querySelector('.modalCriarConta');

      modal.style.display = "block";



    }

    function fecharModalCriar(){

      let modal = document.querySelector('.modalCriarConta');

      modal.style.display = "none";


    }

    return(

    <div className='header'>

        <div className='modalCriarConta'>
            <div className='formCriarConta'>
                <div onClick={()=>fecharModalCriar()} className='close-modal-criar'>X</div>
                <h2>Criar Conta</h2>
                <form onSubmit={(e)=>criarConta(e)}>
                    <input id= "email-cadastro" type="text" placeholder='Seu e-mail...'/>
                    <input id= "username-cadastro" type="text" placeholder='Seu username...' />
                    <input id="senha-cadastro" type="password" placeholder='Sua senha...'/>
                    <input type = "submit" value="Criar conta"/>
                </form>
            </div>


        </div>


        <div class = "center">
            <div className="header_logo">
              <a href=''><img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"/></a>
            </div>
            {
              (props.user)?
    
              <div class ="header_logadoInfo">
                <span>Olá, <b>{props.user}</b></span>
                
                <a href='#'>Post</a>
               
              </div>
              :
              <div className="header_loginForm">
                <form onSubmit={(e)=>logar(e)}>
                  <input id="email-login" type="text" placeholder ="Login..."/>
                  <input id="senha-login" type="password" placeholder ="Senha..."/>
                  <input type="submit" name="acao" value = "Entrar"/>
                </form>
                <div className = "btn_criarConta">
                  <a onClick={(e)=>abrirModalCriarConta(e)} href = "#"> Criar conta</a>
                </div>
              </div>
            }
            
        </div>
        
    </div>







    )


}


export default Header;