import client, {Connection, Channel} from 'amqplib'
import { logger } from '../config/logger';
import { config } from '../config/config';

class RabbitService {
    private channel!: Channel;
    private connection!: Connection;
    
    constructor() {
        this.init()
    }

    private async init(){
        this.connection = await client.connect(config.rabbitmq);
        this.channel = await this.connection.createChannel();
        await this.channel.assertQueue('newRoster');
        await this.channel.assertQueue('modifiedRoster');
    }
  
    async sendNewRosterToBot(token: string): Promise<Boolean> {
        try{
            logger.info(`Sending New Roster to RabbitMQ Token: ${ token }`);
            await this.channel.sendToQueue('newRoster', Buffer.from(token));
            logger.info(`Token Sent.`)
        } catch(e){
            console.log(`Unable To Send New Roster Token: ${e}`);
        }
        return true;
    }
}
  
  
  const rabbitService = new RabbitService();
  
  export { rabbitService };