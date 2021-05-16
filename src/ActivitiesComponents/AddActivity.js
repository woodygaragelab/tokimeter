import {React,useState} from 'react'

function AddActivity() {
    const[activity,setActivity] = useState('')
    const[time,setTime] = useState('')
    const[member1,setMember1] = useState('')


    return (
        <div>
            <form >
                <div align='left' className='form-group'>
                    <label>イベント名</label>
                    <input type='text' class="form-control" placeholder='イベントを入れてね'/>
                </div>
                <div align='left' className='form-group'>
                    <label>時間</label>
                    <input type='text' class="form-control" placeholder='時間を入れてね'/>
                </div>
                <div align='left' className='form-group'>
                    <label>メンバー１</label>
                    <input type='text' class="form-control" placeholder='メンバー名前を入れてね'/>
                </div>
                <div align='left' className='form-group'>
                    <label>メンバー２</label>
                    <input type='text' class="form-control" placeholder='メンバー名前を入れてね'/>
                </div>
                <div align='left' className='form-group'>
                    <label>メンバー３</label>
                    <input type='text' class="form-control" placeholder='メンバー名前を入れてね'/>
                </div>
                <div align='left' className='form-group'>
                    <label>メンバー４</label>
                    <input type='text' class="form-control" placeholder='メンバー名前を入れてね'/>
                </div>

                <input type='submit' value='保存' className='btn btn-success'/>
            </form>
        </div>
    )
}

export default AddActivity
