import React, {useEffect, useState} from 'react';
import firebase from 'firebase/compat/app';
import {auth,storage,db} from './firebase';


  
function Header(props){

    const [progress,setProgress] = useState(0);

    const [file, setFile] = useState(null);
    
    useEffect(()=>{
       
    }, [])
    

    //Criar conta
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

    //Upload

    function abrirModalUpload(e){
      e.preventDefault();

      let modal = document.querySelector('.modalUpload');

      modal.style.display = "block";

    }

    function fecharModalUpload(){

      let modal = document.querySelector('.modalUpload');

      modal.style.display = "none";


    }

    function uploadPost(e){
        e.preventDefault(); 
        let titulosPost = document.getElementById('legenda').value;
        let progressEl = document.getElementById('progress-upload');
        
        const uploadTask = storage.ref(`images/${file.name}`).put(file);

        uploadTask.on("state_changed", function(snapshot){
          const progress = Math.round(snapshot.bytesTransferred/snapshot.totalBytes) * 100;
          setProgress(progress);
        }, function (error){

        }, function (){

          storage.ref("images").child(file.name).getDownloadURL()
          .then(function(url){
              db.collection('posts').add({
                titulo:titulosPost,
                image: url,
                userName: props.user,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()

              })

              setProgress(0);
              setFile(null);

              alert('Upload realizado com sucesso!');

              document.getElementById('form-upload').reset();
          })

        })
       
    }

    return(
      //formulario para criar conta
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


     
        
      <div className='modalUpload'>
            <div className='formUpload'>
                <div onClick={()=>fecharModalUpload()} className='close-modal-post'>X</div>
                <h2>Fazer Post</h2>
                <form id='form-upload'onSubmit={(e)=>uploadPost(e)}>
                    <progress id="progress-upload" value={progress}></progress>
                    <input onChange={(e)=>setFile(e.target.files[0])} type = "file" name="file"/>
                    <input id="legenda" type="text" placeholder='Escreva sua legenda...'/>
                    <input type = "submit" value="Postar no instagram"/>
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

                <a onClick={(e)=>abrirModalUpload(e)} href='#'>Post</a>
               
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