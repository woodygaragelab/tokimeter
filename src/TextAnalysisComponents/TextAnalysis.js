import React from 'react'

export const TextAnalysis = () => {
    return (
        <>
            <div className="container">
                <form>
                    <div className='form-group'>
                        <label>分析内容</label>
                        <textarea id="input-text" class="form-control" placeholder='会話内容を入れてね' />
                    </div>
                   
                        <button className="btn btn-success mr-4" id="sendText">送信</button>
               
                </form>
            </div>
        </>
    )
}

export default TextAnalysis
