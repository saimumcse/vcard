package pageObject;

//import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
//import org.openqa.selenium.support.ui.Select;

public class InfoPage {

	WebDriver driver = null;

	public InfoPage(WebDriver driver) {
		this.driver = driver;
	}

	By createBtn = By.className("custom-button");
	By qrName = By.xpath("//body/div[1]/section[1]/div[1]/div[1]/div[1]/div[2]/input[1]");
	By submitBtn = By.xpath("//body[1]/div[1]/section[1]/div[1]/div[3]/div[1]/button[1]/span[1]");
	By selectDesign= By.xpath("//body/div[1]/section[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/section[1]/div[4]/span[1]");
	By firstName= By.xpath("//body/div[1]/section[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/section[1]/div[1]/div[1]/form[1]/div[1]/div[1]/div[2]/div[1]/div[1]/input[1]");
	By lastName= By.xpath("//body/div[1]/section[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/section[1]/div[1]/div[1]/form[1]/div[2]/div[1]/div[2]/div[1]/div[1]/input[1]");
	By phoneNumber = By.xpath("//input[@name='phone']");
	By altPhone = By.xpath("//input[@name='alt_phone']");
	By email = By.xpath("//body/div[1]/section[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/section[1]/form[1]/div[1]/div[3]/div[1]/div[1]/div[2]/div[1]/div[1]/input[1]");
	By personalWeb = By.xpath("//body/div[1]/section[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/section[1]/form[1]/div[1]/div[4]/div[1]/div[1]/div[2]/div[1]/div[1]/input[1]");
	By companyName = By.xpath("//body/div[1]/section[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/section[1]/form[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/input[1]");
	By profession = By.xpath("//body/div[1]/section[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/section[1]/form[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/input[1]");
	By summary = By.xpath("//body/div[1]/section[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/section[1]/form[3]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/textarea[1]");
	By searchBox = By.xpath("//input[@id='country']");
	By finalSubmit= By.xpath("(//button[@type='button'])[4]");
	
	public void createBtn() {
		driver.findElement(createBtn).click();
	}

	public void qrName(String text) {
		driver.findElement(qrName).sendKeys(text);
	}
	
	public void submitBtn() {
		driver.findElement(submitBtn).click();
	}
	
	public void selectDesign() {
		driver.findElement(selectDesign).click();
	}
	
	public void firstName(String text) {
		driver.findElement(firstName).sendKeys(text);
	}
	
	public void lastName(String text) {
		driver.findElement(lastName).sendKeys(text);
	}
	
	public void phoneNumber(String text) {
		driver.findElement(phoneNumber).sendKeys(text);
	}
	
	public void altPhone(String text) {
		driver.findElement(altPhone).sendKeys(text);
	}
	
	public void personalWeb(String text) {
		driver.findElement(personalWeb).sendKeys(text);
	}
	
	public void email(String text) {
		driver.findElement(email).sendKeys(text);
	}
	
	public void companyName(String text) {
		driver.findElement(companyName).sendKeys(text);
	}
	
	public void profession(String text) {
		driver.findElement(profession).sendKeys(text);
	}
	
	public void summary(String text) {
		driver.findElement(summary).sendKeys(text);
	}
	
	public void scrollDown(WebDriver driver, int pixels) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("window.scrollBy(0, arguments[0]);", pixels);
    }
	
	/*public void drpDownSelect(String text) {
		WebElement drpDownSelectEle = driver.findElement(drpDownSelect);
		
		Select drpCountry = new Select(drpDownSelectEle);
		List<WebElement>alloptions = drpCountry.getOptions();
		
		for(WebElement option : alloptions) {
			if(option.getText().equals(text)) {
				option.click();
				break;
			}
		}
	}*/
	
	/*public void searchBox (String text) {
		WebElement searchBox= driver.findElement(searchBox);
		searchBox.sendKeys("Bangladesh");
		text= searchBox.getAttribute("value");
		if(text.equals("Bangladesh")) {
			searchBox.sendKeys(Keys.ENTER);
		}*/
		
		public void searchBox(WebDriver driver, String text) {
	        WebElement searchBoxEle = driver.findElement(searchBox);

	        // Clear any existing text in the search box
	        searchBoxEle.clear();

	        // Type the search term into the search box
	        searchBoxEle.sendKeys(text);

	        // You can either press Enter to submit the search
	        searchBoxEle.sendKeys(Keys.ENTER);

	        // Or you can click a search button if available
	        // driver.findElement(By.id("searchButton")).click();
	    }
	
	
	public void finalSubmit(String text) {
		driver.findElement(finalSubmit).click();
	}
	
	
	

	
	
}
