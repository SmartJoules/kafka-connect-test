const { Kafka } = require("kafkajs");
async function main() {
  var kafka = new Kafka({
    clientId: "kafka-connect-test",
    brokers: [
      "b-1.devicedata.iuc58g.c14.kafka.us-west-2.amazonaws.com:9096",
      "b-2.devicedata.iuc58g.c14.kafka.us-west-2.amazonaws.com:9096",
    ],
    ssl: true,
    sasl: {
      mechanism: "scram-sha-512", // scram-sha-256 or scram-sha-512
      username: "AKIA4Y67PIL2VRMBPKFE",
      password: "yHPpgajJuUWLx7kKggVSnbTqAC8yzYp48U6Y1Ldq",
    },
  });
  const consumer = kafka.consumer({ groupId: "test-kafka-repo" });
  await consumer.connect();
  await consumer.subscribe({ topic: "device-data", fromBeginning: false });
  await consumer.run({
    eachBatch: async ({
      batch,
      resolveOffset,
      heartbeat,
      commitOffsetsIfNecessary,
      uncommittedOffsets,
      isRunning,
      isStale,
      pause,
    }) => {
      let offset = 0;
      let data = [];
      let rawPackets = [];
      console.log('connected to server');
      await heartbeat();
    },
  });
}
main().then(res=>{
console.log("connected");
}).catch(err=>{
 console.error(err)
})
