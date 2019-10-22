package slackintegration;

import java.util.concurrent.TimeUnit;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
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

                Thread.sleep(10000);
                wait.withTimeout(10, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
                int final_count = driver.findElements(By.xpath("//*[contains(text(),'Scanning complete. File safe to download')]")).size();
                int difference = final_count-initial_count;
                assertTrue(difference > 0 || final_count > 0);

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
                difference = final_count-initial_count;
                assertTrue(difference > 0 || final_count > 0);

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
                difference = final_count-initial_count;
                assertTrue(difference > 0 || final_count > 0);

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
                difference = final_count-initial_count;
                assertTrue(difference > 0 || final_count > 0);

                //********************************* USE CASE 2 Inappropriate Image***************************************//
                
                initial_count = driver.findElements(By.xpath("//*[contains(text(),'Image is inappropriate')]")).size();
                
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
                        WebElement select_image = driver.findElement(By.xpath("//*[text()='abcdef inappropriate.JPG']"));
                        select_image.click();
                        WebElement click_select = driver.findElement(By.xpath("//*[text()='Select']"));
                        click_select.click();
                }
                driver.switchTo().window(currentHandle);

                Thread.sleep(10000);
                final_count = driver.findElements(By.xpath("//*[contains(text(),'Image is inappropriate')]")).size();
                difference = final_count-initial_count;
                assertTrue(difference > 0 || final_count > 0);

                driver.close();
                driver.quit();
                
                // Login as an ADMIN user to verify the report of the inappropriate content receipt
                driver = new ChromeDriver();
                driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
                
                //Setting the URL
                driver.get(System.getenv("SLACK_WORKSPACE_URL"));
                driver.manage().window().maximize();

                // Wait for the sign in button
                wait = new WebDriverWait(driver, 30);
                wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("signin_btn")));

                email = driver.findElement(By.id("email"));
                pw = driver.findElement(By.id("password"));

                //Setting the email and password
                email.sendKeys(System.getenv("ADMIN_EMAIL"));
                pw.sendKeys(System.getenv("ADMIN_PASSWORD"));
                
                // Click the sign-in button
                signin = driver.findElement(By.id("signin_btn"));
                signin.click();

                // Go to #general channel
                wait.until(ExpectedConditions.titleContains("general"));
                
                // Switch to #management channel (a private channel for ADMIN and secbot app) and wait for it to load.
            	driver.get(System.getenv("SLACK_WORKSPACE_URL") + "/messages/management");
            	wait.until(ExpectedConditions.titleContains("management"));
                
            	WebElement checkReport = driver.findElement(By.xpath("//*[contains(text(),'imgReport')]"));
                assertNotNull(checkReport);
                
                //********************************* USE CASE 3 REPORT***************************************//
                
                // In the management channel, ADMIN asks for a report listing all corrupted content from secbot app 
                messageBot = driver.findElement(By.xpath("//*[@id=\"undefined\"]/p"));

                messageBot.sendKeys("Send the corrupted files report");
                messageBot.sendKeys(Keys.RETURN);

                wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
                
                checkReport = driver.findElement(By.xpath("//*[contains(text(),'report.csv')]"));
                assertNotNull(checkReport);
                
                System.out.println("Successfully completed selenium testing for 3 use cases");
                Thread.sleep(10000);
                
                driver.close();
                driver.quit();
        }
}
