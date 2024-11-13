let preveiwContainer = document.querySelector('.shows-preveiw');
let preveiwBox = preveiwContainer.querySelectorAll('.preview');

document.querySelectorAll('.shows-container .show').forEach(show => {
    show.onclick = () => {
        preveiwContainer.style.display = 'flex';
        let name = show.getAttribute('data-name');
        preveiwBox.forEach(preview => {
            let target = preview.getAttribute('data-target');
            if (name == target) {
                preview.classList.add('active');
            }
        });
    };
});

preveiwBox.forEach(close =>{
    close.querySelector('.fa-times').onclick = () =>{
        close.classList.remove('active')
        preveiwContainer.style.display = 'none';
    };
});