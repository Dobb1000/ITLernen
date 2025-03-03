function loadHeader() {
    fetch('/ITLernen/header.html')
        .then(response => response.text())
        .then(data => {

            window.addEventListener("scroll", function () {
                let header = document.querySelector(".header");
                if (window.scrollY > 0) {
                    header.classList.add("scrolled");
                } else {
                    header.classList.remove("scrolled");
                }
                console.log(window.scrollY)

            });

            console.log(window.scrollY)


            document.getElementById('header-container').innerHTML = data;


            /**
             * Mobile nav toggle
             */
            const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

            function mobileNavToogle() {
                document.querySelector('body').classList.toggle('mobile-nav-active');
                mobileNavToggleBtn.classList.toggle('bi-list');
                mobileNavToggleBtn.classList.toggle('bi-x');
            }
            if (mobileNavToggleBtn) {
                mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
            }

            /**
             * Hide mobile nav on same-page/hash links
             */
            document.querySelectorAll('#navmenu a').forEach(navmenu => {
                navmenu.addEventListener('click', () => {
                    if (document.querySelector('.mobile-nav-active')) {
                        mobileNavToogle();
                    }
                });

            });

            /**
             * Toggle mobile nav dropdowns
             */
            document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
                navmenu.addEventListener('click', function(e) {
                    e.preventDefault();
                    this.parentNode.classList.toggle('active');
                    this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
                    e.stopImmediatePropagation();
                });
            });
        })
        .catch(error => console.error('Error loading header:', error));






}

loadHeader();
