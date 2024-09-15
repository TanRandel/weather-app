<script>
export default {
  name: 'app',
  data () {
    return {
      api_key: '4fbde27cb6ee8187b8b7087d7a0138e8',  // Hardcoded API key for testing
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      weather: {},
      error: ''  // To store any error messages
    }
  },
  methods: {
    fetchWeather (e) {
      if (e.key === "Enter") {  // Strict comparison
        fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
          .then(res => {
            if (!res.ok) {
              throw new Error('City not found');  // Throw an error if response is not OK
            }
            return res.json();
          })
          .then(this.setResults)
          .catch(err => {
            this.error = err.message;  // Set error message in case of an issue
            this.weather = {};  // Reset weather data
          });
      }
    },
    setResults (results) {
      this.weather = results;
      this.error = '';  // Clear error if results are successful
    },
    dateBuilder () {
      let d = new Date();
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`;
    }
  }
}
</script>

<template>
  <div id="app" :class="typeof weather.main !== 'undefined' && weather.main.temp > 16 ? 'warm' : ''">
    <main>
      <div class="search-box">
        <input 
          type="text" 
          class="search-bar" 
          placeholder="Search for a city..." 
          v-model="query" 
          @keypress="fetchWeather" 
        />
      </div>

      <!-- Error Message -->
      <div class="error-message" v-if="error">
        <p>{{ error }}</p>
      </div>

      <!-- Weather Information -->
      <div class="weather-wrap" v-if="typeof weather.main !== 'undefined'">
        <div class="location-box">
          <div class="location">{{ weather.name }}, {{ weather.sys.country }}</div>
          <div class="date">{{ dateBuilder() }}</div>
        </div>

        <div class="weather-box">
          <div class="temp">{{ Math.round(weather.main.temp) }}°c</div>
          <div class="weather">{{ weather.weather[0].main }}</div>
        </div>

        <!-- Additional Weather Details -->
        <div class="additional-info">
          <p><strong>Feels like:</strong> {{ Math.round(weather.main.feels_like) }}°c</p>
          <p><strong>Humidity:</strong> {{ weather.main.humidity }}%</p>
          <p><strong>Wind Speed:</strong> {{ Math.round(weather.wind.speed * 3.6) }} km/h</p> <!-- Converted from m/s to km/h -->
          <p><strong>Description:</strong> {{ weather.weather[0].description }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
body {
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

#app {
  background-image: url('../assets/cold-bg.jpg');
  background-size: cover;
  background-position: center;
  transition: background 0.4s ease-in-out;
}

#app.warm {
  background-image: url('../assets/warm-bg.jpg');
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 25px;
  background: rgba(0, 0, 0, 0.6);
}

.search-box {
  width: 100%;
  max-width: 600px;
  margin-bottom: 50px;
}

.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px 20px;
  font-size: 20px;
  color: #333;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease-in-out;
}

.search-box .search-bar:focus {
  background-color: #fff;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  outline: none;
}

.location-box .location {
  color: #fff;
  font-size: 36px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;
  text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.5);
}

.location-box .date {
  color: #f0f0f0;
  font-size: 18px;
  text-align: center;
  font-style: italic;
  margin-bottom: 30px;
  text-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3);
}

.weather-wrap {
  width: 100%;
  max-width: 600px;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.weather-box .temp {
  font-size: 100px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 20px;
  text-shadow: 3px 6px 10px rgba(0, 0, 0, 0.4);
}

.weather-box .weather {
  font-size: 42px;
  font-weight: 600;
  color: #fff;
  text-shadow: 3px 6px 10px rgba(0, 0, 0, 0.4);
  margin-bottom: 20px;
}

/* Error Message Styling */
.error-message p {
  color: #ff4d4d;
  font-size: 20px;
  text-align: center;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 20px;
  background-color: rgba(255, 77, 77, 0.2);
  border: 2px solid #ff4d4d;
  max-width: 500px;
  margin: 0 auto 30px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Additional weather information styling */
.additional-info {
  color: #fff;
  font-size: 20px;
  text-align: center;
  background: rgba(255, 255, 255, 0.15);
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
}

.additional-info p {
  margin: 8px 0;
  font-size: 18px;
  font-weight: 500;
}

.additional-info strong {
  color: #e0e0e0;
}


</style>
