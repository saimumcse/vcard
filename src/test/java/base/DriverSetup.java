package base;

import java.time.Duration;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeSuite;

import io.github.bonigarcia.wdm.WebDriverManager;

public class DriverSetup {

	public static WebDriver driver;
	public static String baseUrl = "https://testapp.cisstaging.com/";
	
	@BeforeSuite
	public static void setDriver() {
		WebDriverManager.chromedriver().setup();
		driver = new ChromeDriver();
		
		driver.get(baseUrl);
		driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
		driver.manage().window().maximize();
		
	}
	
	@AfterSuite
	public static void closeDriver() {
		driver.close();
	}
}
