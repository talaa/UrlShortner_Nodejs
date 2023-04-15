function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value
  );
}
///////
function validateorigin(value){
  if (value)
    return value
  else{
    return "undefined"
  }
}
////////
// utils.js
function createChartdata(data){
  const dates = [];
  const counts = [];
  data.forEach(item => {
    const date = new Date(item.ref_date).toLocaleDateString();
    if (dates.includes(date)) {
      const index = dates.indexOf(date);
      counts[index]++;
    } else {
      dates.push(date);
      counts.push(1);
    }
  
  });
  //console.log(dates,counts);
  // Create chartData object
  
  const chartData = {
    labels: dates,
    datasets: [{
      label: 'Count',
      data: counts,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };
  

  return chartData ;


}

function createAccordionChart1(shortUrl) {
  const urlId = shortUrl._id;
  const clicks = shortUrl.clicks;
  const dates = clicks.map(click => click.date);
  const counts = clicks.map(click => click.count);
  const chartData = {
    labels: dates,
    datasets: [{
      label: 'Clicks',
      data: counts,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };
  const chartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  const ctx = document.getElementById('chart-' + urlId).getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: chartOptions
  });
  const accordion = document.getElementsByClassName('accordion')[shortUrls.indexOf(shortUrl)];
  accordion.addEventListener('click', function() {
    this.classList.toggle('active');
    const panel = this.nextElementSibling;
    if (panel.style.display === 'block') {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'block';
    }
  });
}
function createAccordionCharts(shortUrls) {
  const tableBody = document.querySelector('tbody');
  const chartOptions = {
    // chart options
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  shortUrls.forEach(shortUrl => {
    const canvas = document.getElementById(`${shortUrl._id}-canvas`);
    const ctx = canvas.getContext('2d');
    const chartData = {
      // chart data
      labels: dates,
      datasets: [{
      label: 'Clicks',
      data: counts,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
    };
    createChart(ctx, chartData, chartOptions);
  });
}


module.exports = { validateUrl,validateorigin,createChartdata};