export function ContactForm() {
    const d = document;

    function validationForm() {
        const $form = d.querySelector(".contact-form"),
              $inputs = d.querySelectorAll(".contact-form [required]");

        $inputs.forEach(input => {
            const $span = d.createElement("span");
            $span.id = input.name;
            $span.textContent = input.title;
            $span.classList.add("contact-form-error", "d-none");
            input.insertAdjacentElement("afterend", $span);
        });

        d.addEventListener("keyup", e => {
            if(e.target.matches(".contact-form [required]")){
                let $input = e.target,
                    pattern = $input.pattern || $input.dataset.pattern;

                if(pattern && $input.value !== ""){
                    let regex = new RegExp(pattern);
                    return !regex.exec($input.value)
                            ? d.getElementById($input.name).classList.add("is-active")
                            : d.getElementById($input.name).classList.remove("is-active");
                }  

                if(!pattern){
                        return $input.value === ""
                            ? d.getElementById($input.name).classList.add("is-active")
                            : d.getElementById($input.name).classList.remove("is-active");
                }
            }
        });      

        d.addEventListener("submit", e => {
            e.preventDefault();
            const $loader = d.querySelector(".contact-form-loader"),
                    $response = d.querySelector(".contact-form-response");
            
            $loader.classList.remove("d-none");
            fetch("https://formsubmit.co/ajax/josevillacres45@gmail.com", {
                    method : "POST", 
                    body: new FormData(e.target)})
                    .then(res => res.ok 
                        ? res.json()
                        : Promise.reject(res))
                    .then(json => {
                        $loader.classList.add("d-none");
                        $response.classList.remove("d-none");
                        $response.innerHTML = `
                        <p> 
                            <article class="text-center">
                                <h3>
                                    Muchas gracias!
                                    <br>
                                    Por tus comentarios 😊,
                                    <br>
                                    Te respondere inmediatamente
                                </h3>
                            </article>
                        </p>`;
                        $form.reset();
                    })
                    .catch(err => {
                        console.log(err);
                        let message = err.statusText || "Ocurrio un error al enviar, intenta nuevamente";
                        $response.innerHTML = `<p>Error ${err.status} : ${message}</p>`;
                    });
        });
    }

    validationForm();

}