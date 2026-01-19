import React from 'react'

const InterfaceChat = () => {
  return (
    <div>
        <div className='row mt-4 p-2'>
            <div className="col-md-5">
                <h5>SIA</h5>
            </div>
            <div className="col-md-7 d-flex justify-content-end">
                <span className="material-symbols-outlined ">more_vert</span>
            </div>
        </div>
            <div className='container my-5 mb-5' style={{minHeight:"320px"}}>
                <div className='m-5 p-3 '>
                    <div className="mt-5 text-center align-items-center">
                        <h4>Bonjour , comment puis-je vous aider aujourd'hui?</h4>
                    </div>
                </div> 
            </div>
            <div className="container">
                <form className='mx-4'>
                    <div className='input-group custom-pass-group '>
                        <input type="text" className='form-control p-3 border-end-0 rounded-start-4' placeholder="Demandez moi n'importe quoi concernant l'autisme ..." />
                        <button className='input-group-text rounded-end-4 bg-background-light dark:bg-background-dark' >
                            <span className="material-symbols-outlined rounded-pill p-3" style={{backgroundColor:'var(--primary-dark)'}}>send</span>
                        </button>
                    </div>
                    
                </form>
                <div className="container px-5 mx-5">
                    <p className='d-flex my-3'><span className="material-symbols-outlined me-2">info</span> SIA peut se tromper dans ses réponses, il est important de vérifier chaque réponse fournie</p>
                </div>
            </div>

    </div>
  )
}

export default InterfaceChat