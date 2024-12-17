export class WeatherService {
    static async getWeather(location) {
        // Simulated weather data for demo
        // In a real app, this would make an API call to a weather service
        const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Overcast'];
        const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
        const randomTemp = Math.floor(Math.random() * (30 - 15) + 15);

        return {
            condition: randomCondition,
            temperature: randomTemp,
            location: {
                latitude: location.latitude,
                longitude: location.longitude
            }
        };
    }
}