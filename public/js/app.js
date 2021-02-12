console.log('Client side javascript')


const weatherform=document.querySelector('form')
const search=document.querySelector('input')

var m1=document.querySelector('#m_1')
var m2=document.querySelector('#m_2')


weatherform.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location=search.value

    m1.textContent='Loading...'
    m2.textContent=''
    fetch('/weather?address='+location).then((response)=>{
    
    response.json().then((data)=>{
        if(data.error)
        {
            
            m1.textContent=data.error
        }
        else{
        
        m1.textContent=data.location
        m2.textContent=data.forecast
     
        }
    })
    
})
    
})