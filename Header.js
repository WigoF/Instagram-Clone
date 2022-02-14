import {useEffect, useState} from 'react';



function Header(props){
    
    useEffect(()=>{
       
    }, [])
    
    function abrirModalCriarConta(e){
        e.preventDeFault();
    }


    return(

    <div className='header'>

        <div className='modalCriarConta'>
            <div className='formCriarConta'>
                <div className='close-modal-criar'>X</div>
                <h2>Criar Conta</h2>
                <form>
                    <input type="text" placeholder='Seu e-mail...'/>
                    <input type="text" placeholder='Seu username...' />
                    <input tyhpe="password" placeholder='Sua senha...'/>
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
                <form>
                  <input type="text" placeholder ="Login..."/>
                  <input type="password" placeholder ="Senha..."/>
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