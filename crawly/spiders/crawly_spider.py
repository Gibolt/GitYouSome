from scrapy.spider import BaseSpider
from scrapy.selector import HtmlXPathSelector
from crawly.items import CrawlyItem



class CrawlySpider(BaseSpider):
	name = "crawly" 
        language = "javascript"
        startURL = "https://raw.githubusercontent.com/DanielRapp/doppler/master/doppler.js"
	allowed_domains = ["githubusercontent.com", "raw.githubusercontent.com", "github.com"] 
	start_urls = [startURL]

	def parse(self, response):               
                item = CrawlyItem()
                num_var = 0
                para = response.xpath('/html/body/p.text()).extract() 
                u_para = para[0].split("\n") #unicode
                #tmp = u_para[0].split(" ")
                #words = [20]

                for b in u_para:
                        tmp = b.split(" ")
                        for a in tmp:
                                if(a.strip()==u"var"):
                                        print b
                                        #words[num_var] = tmp
                                        num_var+=1
                       

                item['txt_t'] = u_para
                item['num'] = para

                return item


        


		



