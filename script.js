document.querySelectorAll('.unit-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const unit = this.dataset.unit;
        const dayElement = this.closest('.day');

        dayElement.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        dayElement.querySelectorAll('.temp, .temp-value').forEach(temp => {
            let tempText = temp.textContent;
            let temperatures = tempText.match(/\d+/g);

            if (temperatures) {
                temperatures = temperatures.map(t => parseInt(t));
                if (unit === 'F') {
                    temperatures = temperatures.map(t => Math.round(t * 9/5 + 32));
                } else {
                    temperatures = temperatures.map(t => Math.round((t - 32) * 5/9));
                }

                if (temp.classList.contains('temp')) {
                    temp.textContent = `${temperatures[0]}°${unit}/${temperatures[1]}°${unit}`;
                } else {
                    const hourIndex = [...temp.parentNode.parentNode.children].indexOf(temp.parentNode); 
                    temp.textContent = temperatures[hourIndex]; 
                    temp.nextElementSibling.textContent = `°${unit}`; 
                }
            }
        });
    });
});

document.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.textContent = this.textContent === '☆' ? '★' : '☆';
        this.classList.toggle('active');
    });
});

document.querySelectorAll('.toggle-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const day = button.closest('.day');
        day.classList.toggle('expanded');
    });
});

function highlightCurrentHour() {
    const currentHour = new Date().getHours();
    document.querySelectorAll('.hourly-temp tr').forEach(row => {
        const timeCell = row.querySelector('.time-cell span');
        const hour = parseInt(timeCell.textContent);
        if (hour === currentHour) {
            row.classList.add('current-hour');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    highlightCurrentHour();
});
