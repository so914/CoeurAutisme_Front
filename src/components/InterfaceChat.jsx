import React from 'react'

const InterfaceChat = () => {
  return (
    <div>
        <div className='row'>
            <div className="col-md-5">
                <h5>SIA</h5>
            </div>
            <div className="col-md-6 d-flex justify-content-end">
                <span className="material-symbols-outlined ">more_vert</span>
            </div>
            <div className='container my-5 mb-5' style={{minHeight:"320px"}}>
                <div className='m-5 p-3'>
                    <div className="mx-5">
                        <h4>Bonjour , comment puis-je vous aider aujourd'hui?</h4>
                    </div>
                </div> 
            </div>
            <div className="container">
                <form >
                    <div className='input-group custom-pass-group'>
                        <input type="text" className='form-control p-3 border-end-0 rounded-start-4' placeholder="Demandez moi n'importe quoi concernant l'autisme ..." />
                        <button className='input-group-text rounded-end-4 border-circle' style={{backgroundColor:'var(--primary-dark)'}}>
                            <span className="material-symbols-outlined">send</span>
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
  )
}

export default InterfaceChat