const form=document.getElementById('formUser')
if (form){
    form.addEventListener('submit', function(event){

        event.preventDefault()

        console.log(event)

        const newUser=document.querySelectorAll('input').value
        console.log(newUser)

        fetch('/users',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({newUser:newUser}
        )})
    })
}

const update=document.getElementById('editUser')
if (update){
    update.addEventListener('submit', function(event){

        event.preventDefault()

        console.log(event)

        const userContent=document.querySelectorAll('input').value
        console.log(userContent)

            fetch('', {
                method:'PUT',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({userModified:userContent}
            )})

            // .then(function(response){
            //     if(response.status===200){
            //         location.href='/'
            //     }
            // })
    })
}