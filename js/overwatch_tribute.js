window.onload = function() {
  let hoverDescription = document.getElementsByClassName('hover-description')[0];
  let heroes = document.querySelectorAll(".hero-grid img");  
  heroes.forEach((hero, idx, parent) => {    
    hero.addEventListener('mouseover', (event) => {
      let name = hoverDescription.querySelector('.name');
      name.textContent = hero.getAttribute('data-attr-name');

      let nationality = hoverDescription.querySelector('.nationality');
      nationality.textContent = hero.getAttribute('data-attr-nationality');

      let rect = hero.getBoundingClientRect();
      let top = rect.top + pageYOffset - 65;
      let left = rect.left + pageXOffset + 10;

      hoverDescription.style.left = left + hero.offsetWidth + 'px';
      hoverDescription.style.top = top + 'px';
      
      hoverDescription.style.opacity = .9;
      
    });

    hero.addEventListener('mouseout', (event) => {      
      hoverDescription.style.opacity = 0;
      hoverDescription.style.left = "-1000px";
      hoverDescription.style.top = "-1000px";
    });
  });

};