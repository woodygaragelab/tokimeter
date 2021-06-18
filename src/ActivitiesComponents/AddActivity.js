import {React,useState} from 'react'

function AddActivity({onAdd}) {
    const[activity,setActivity] = useState('')
    const[time,setTime] = useState('')
    const[member1,setMember1] = useState('')
    const[member2,setMember2] = useState('')
    const[member3,setMember3] = useState('')
    const[member4,setMember4] = useState('')


    const onSubmit = (e) => {
        e.preventDefault()

        if(!activity){
            alert('イベント名を入力ください')
            return
        }

        if(!time){
            alert('時間を入力ください')
            return 
        }

        if(!member1){
            alert('メンバーの名前を入力ください')
            return
        }

        onAdd({ activity, time, member1, member2, member3, member4})

        setActivity('')
        setTime('')
        setMember1('')

    }


    return (
        <div>
            <form onSubmit={onSubmit}>
                <div align='left' className='form-group'>
                    <label>イベント名</label>
                    <input type='text' class="form-control" placeholder='イベントを入れてね' value={activity} onChange={(e) => setActivity(e.target.value)}/>
                </div>
                <div align='left' className='form-group'>
                    <label>時間</label>
                    <input type='text' class="form-control" placeholder='時間を入れてね' type = "date" value={time} onChange={(e) => setTime(e.target.value)}/>
                </div>
                <div align='left' className='form-group'>
                    <label>メンバー１</label>
                    <input type='text' class="form-control" placeholder='メンバー名前を入れてね' value={member1} onChange={(e) => setMember1(e.target.value)}/>
                </div>
                <div align='left' className='form-group'>
                    <label>メンバー２</label>
                    <input type='text' class="form-control" placeholder='メンバー名前を入れてね' value={member2} onChange={(e) => setMember2(e.target.value)}/>
                </div>
                <div align='left' className='form-group'>
                    <label>メンバー３</label>
                    <input type='text' class="form-control" placeholder='メンバー名前を入れてね' value={member3} onChange={(e) => setMember3(e.target.value)}/>
                </div>
                <div align='left' className='form-group'>
                    <label>メンバー４</label>
                    <input type='text' class="form-control" placeholder='メンバー名前を入れてね'value={member4} onChange={(e) => setMember4(e.target.value)}/>
                </div>

                <input type='submit' value='保存' className='btn btn-success'/>
            </form>
        </div>

    )

}


export default AddActivity
