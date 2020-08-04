from django.core.management.base import BaseCommand, CommandError
from selenium import webdriver
from chromedriver_py import binary_path
from cheatsheet2020.models import LocalElection, LocalOffice, LocalCandidate

class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def add_arguments(self, parser):
        pass
        # parser.add_argument('poll_ids', nargs='+', type=int)

    def handle(self, **options):
        driver = webdriver.Chrome(executable_path=binary_path)
        driver.get('https://voterguide.sfelections.org/en/candidate-information')
        driver.find_element_by_xpath("""//*[@id="block-menu-block-6"]/div/ul/li[2]/div/div[2]/div[1]""").click()
        links = driver.find_elements_by_css_selector("a.menu__link.menu__link")
        offices = []
        try:
            local_election = LocalElection.objects.get(local_area='san francisco')
        except LocalElection.DoesNotExist:
                print("Failed")

        counter = 0
        for link in links:
            if "Candidate for" in links[counter].text or "Candidates for" in links[counter].text:
                if "Candidate for" in links[counter].text:
                    local_office = LocalOffice(local_election=local_election, name=links[counter].text[14:])
                elif "Candidates for" in links[counter].text:
                    local_office = LocalOffice(local_election=local_election, name=links[counter].text[15:])

                local_office.save()
                links[counter].click()
                names = driver.find_elements_by_css_selector("a.fieldset-title")
                for name in names:
                    local_candidate = LocalCandidate(name=name.text[5:], office=local_office)
                    local_candidate.save()
                    # print(name.text[5:])
                links = driver.find_elements_by_css_selector("a.menu__link.menu__link")

            counter = counter + 1


        # for i in range(offices):
        #     if "Candidate for" in link.text:
        #         local_office = LocalOffice(local_election=local_election, name=offices[i].text[14:])
        #         local_office.save()
        #     elif "Candidates for" in link.text:
        #         local_office = LocalOffice(local_election=local_election, name=offices[i].text[15:])
        #         local_office.save()
            
        #     offices[i].click()
        #     names = driver.find_elements_by_css_selector("a.fieldset-title")
        #     for name in names:
        #         # local_candidate = LocalCandidate(name=name.text[5:])
        #         # local_candidate.save()
        #         print(name.text)
        #     links = driver.find_elements_by_css_selector("a.menu__link.menu__link")
        #     for link in links:
        #         if "Candidate for" in link.text:
        #             offices.append(link)
            

        # print(offices)
        # for office in offices:
        #     local_office = LocalOffice(local_election=local_election, name=office)
        #     local_office.save()
