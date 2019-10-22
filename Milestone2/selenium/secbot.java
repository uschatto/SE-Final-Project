package slackintegration;

import java.util.concurrent.TimeUnit;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class secbot
{
        public static WebDriver driver = null;
        public static void main(String[] args) throws InterruptedException
        {
                //Setting the location of chromedriver
                System.setProperty("webdriver.chrome.driver", System.getenv("CHROMEDRIVER"));
                driver = new ChromeDriver();
                driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

                //Setting the URL
                driver.get(System.getenv("SLACK_WORKSPACE_URL"));
                driver.manage().window().maximize();

                // Wait for the sign in button
                WebDriverWait wait = new WebDriverWait(driver, 30);
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("signin_btn")));

                WebElement email = driver.findElement(By.id("email"));
                WebElement pw = driver.findElement(By.id("password"));

                //Setting the email and password
                email.sendKeys(System.getenv("SELENIUM_USER_EMAIL"));
                pw.sendKeys(System.getenv("SELENIUM_USER_PASSWORD"));

                // Click the sign-in button
                WebElement signin = driver.findElement(By.id("signin_btn"));
                signin.click();

                // Go to #general channel
                wait.until(ExpectedConditions.titleContains("general"));

                // Welcome message
                WebElement messageBot = driver.findElement(By.xpath("//*[@id=\"undefined\"]/p"));

                messageBot.sendKeys("Hello Dunder Mifflin, from Creed");
                messageBot.sendKeys(Keys.RETURN);

                wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);

                //********************************* USE CASE 1 NORMAL FILE ***************************************//

                
                int initial_count = driver.findElements(By.xpath("//*[contains(text(),'Scanning complete. File safe to download')]")).size();
                
                // Locate the Attach button
                messageBot = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[4]/div/div/footer/div/div/div[1]/button"));
                messageBot.click();                
    
                // Click on the Google Drive button
                WebElement upload = driver.findElement(By.xpath("//*[text()='Google Drive']"));
                upload.click();

                // Wait for 5 seconds for the driver to load all window handles
                Thread.sleep(5000);

                // Logic to switch to a new window handle
                java.util.Set<String> allHandles = driver.getWindowHandles();
                String currentHandle = driver.getWindowHandle();
                allHandles.remove(currentHandle);
                String nextHandle=allHandles.iterator().next();
                String newHandle = "";
                if(currentHandle != nextHandle)
                {
                        newHandle = nextHandle;
                        driver.switchTo().window(newHandle);
                        driver.manage().window().maximize();

                        // The window handle loaded is a frame
                        driver.switchTo().frame(1);
                        WebElement select_image = driver.findElement(By.xpath("//*[text()='abcdef.pdf']"));
                        select_image.click();
                        WebElement click_select = driver.findElement(By.xpath("//*[text()='Select']"));
                        click_select.click();
                }
                driver.switchTo().window(currentHandle);
                
                Thread.sleep(20000);
                int final_count = driver.findElements(By.xpath("//*[contains(text(),'Scanning complete. File safe to download')]")).size();
                int count = final_count-initial_count;
            	assertTrue(count > 0);
            	
                //********************************* USE CASE 1 CORRUPTED FILE***************************************//
                
            	initial_count = driver.findElements(By.xpath("//*[contains(text(),'The file is corrupted')]")).size();
            	
                // Locate the Attach button
                messageBot = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[4]/div/div/footer/div/div/div[1]/button"));
                messageBot.click();
                
    
                // Click on the Google Drive button
                upload = driver.findElement(By.xpath("//*[text()='Google Drive']"));
                upload.click();

                // Wait for 5 seconds for the driver to load all window handles
                Thread.sleep(5000);

                // Logic to switch to a new window handle
                allHandles = driver.getWindowHandles();
                currentHandle = driver.getWindowHandle();
                allHandles.remove(currentHandle);
                nextHandle=allHandles.iterator().next();
                newHandle = "";
                if(currentHandle != nextHandle)
                {
                        newHandle = nextHandle;
                        driver.switchTo().window(newHandle);
                        driver.manage().window().maximize();

                        // The window handle loaded is a frame
                        driver.switchTo().frame(1);
                        WebElement select_image = driver.findElement(By.xpath("//*[text()='abcdef corrupted.pdf']"));
                        select_image.click();
                        WebElement click_select = driver.findElement(By.xpath("//*[text()='Select']"));
                        click_select.click();
                }
                driver.switchTo().window(currentHandle);
                
                Thread.sleep(10000);
                final_count = driver.findElements(By.xpath("//*[contains(text(),'The file is corrupted')]")).size();
                count = final_count-initial_count;
            	assertTrue(count > 0);
                
                //********************************* USE CASE 2 Normal Image***************************************//
            	
            	initial_count = driver.findElements(By.xpath("//*[contains(text(),'Scanning complete. Image safe to download')]")).size();
                
                // Locate the Attach button
                messageBot = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[4]/div/div/footer/div/div/div[1]/button"));
                messageBot.click();
                
    
                // Click on the Google Drive button
                upload = driver.findElement(By.xpath("//*[text()='Google Drive']"));
                upload.click();

                // Wait for 5 seconds for the driver to load all window handles
                Thread.sleep(5000);

                // Logic to switch to a new window handle
                allHandles = driver.getWindowHandles();
                currentHandle = driver.getWindowHandle();
                allHandles.remove(currentHandle);
                nextHandle=allHandles.iterator().next();
                newHandle = "";
                if(currentHandle != nextHandle)
                {
                        newHandle = nextHandle;
                        driver.switchTo().window(newHandle);
                        driver.manage().window().maximize();

                        // The window handle loaded is a frame
                        driver.switchTo().frame(1);
                        WebElement select_image = driver.findElement(By.xpath("//*[text()='abcdef.JPG']"));
                        select_image.click();
                        WebElement click_select = driver.findElement(By.xpath("//*[text()='Select']"));
                        click_select.click();
                }
                driver.switchTo().window(currentHandle);
                
                Thread.sleep(10000);
                final_count = driver.findElements(By.xpath("//*[contains(text(),'Scanning complete. Image safe to download')]")).size();
                count = final_count-initial_count;
            	assertTrue(count > 0);
                
                //********************************* USE CASE 2 Corrupted Image***************************************//
                
            	initial_count = driver.findElements(By.xpath("//*[contains(text(),'The file is corrupted')]")).size();
            	
                // Locate the Attach button
                messageBot = driver.findElement(By.xpath("/html/body/div[2]/div/div/div[4]/div/div/footer/div/div/div[1]/button"));
                messageBot.click();
                
    
                // Click on the Google Drive button
                upload = driver.findElement(By.xpath("//*[text()='Google Drive']"));
                upload.click();

                // Wait for 5 seconds for the driver to load all window handles
                Thread.sleep(5000);

                // Logic to switch to a new window handle
                allHandles = driver.getWindowHandles();
                currentHandle = driver.getWindowHandle();
                allHandles.remove(currentHandle);
                nextHandle=allHandles.iterator().next();
                newHandle = "";
                if(currentHandle != nextHandle)
                {
                        newHandle = nextHandle;
                        driver.switchTo().window(newHandle);
                        driver.manage().window().maximize();

                        // The window handle loaded is a frame
                        driver.switchTo().frame(1);
                        WebElement select_image = driver.findElement(By.xpath("//*[text()='abcdef corrupted.JPG']"));
                        select_image.click();
                        WebElement click_select = driver.findElement(By.xpath("//*[text()='Select']"));
                        click_select.click();
                }
                driver.switchTo().window(currentHandle);
                
                Thread.sleep(10000);
                final_count = driver.findElements(By.xpath("//*[contains(text(),'The file is corrupted')]")).size();
                count = final_count-initial_count;
            	assertTrue(count > 0);
                
                driver.close();
                driver.quit();
                
                
                
        }
}
