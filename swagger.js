const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',
    title: 'Aplikasi REST API',
    description:
      'Dokumentasi yang dihasilkan dengan <b>swagger-autogen</b> module.',
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Index',
      description: 'Endpoints untuk Index',
    },
    {
      name: 'User',
      description: 'Endpoints untuk User',
    },
    {
      name: 'Berita',
      description: 'Endpoints untuk Berita',
    },
    {
      name: 'Pengaduan',
      description: 'Endpoints untuk Pengaduan',
    },
    {
      name: 'PetugasDesa',
      description: 'Endpoints untuk PetugasDesa',
    },
    {
      name: 'Admin',
      description: 'Endpoints untuk Admin',
    },
  ],
  definitions: {
    Salam: {
      pesan: 'hello world',
      method: 'get',
    },
    //     Profile: {
    //       id: 'profile-id',
    //       name: 'user 1',
    //       email: 'user1@email.com',
    //       occupation: 'programmer',
    //       cover: 'cover.jpg',
    //     },
    //     Mail: {
    //       to: 'user1@email.com',
    //       subject: 'ini subject email',
    //       text: 'ini konten email',
    //     },
    //     RetMail: {
    //       message: 'pesan dari server',
    //       message_id: 'message-id',
    //     },

    Berita: {
      id: 1,
      nikpengaduan: 3674120120120,
      judulpengaduan: 'banjir',
      lokasipengaduan: 'menjangan raya',
      deskripsipengaduan: 'air menggenang',
    },
    Beritas: [
      {
        $ref: '#/definitions/Berita',
      },
    ],
    Pengaduan: {
      id: 1,
      Judul: 'Banjir Bandang',
      lokasi: 'Jl Menjangan IV',
      deskripsi: 'Air Tidak Mengalir',
      tanggal: 'Selasa 26 Novber 2021',
      notlp: '081387887675',
      foto: 'cover.jpg',
    },
    Pengaduans: [
      {
        $ref: '#/definitions/Pengaduan',
      },
    ],
    User: {
      id: 1,
      name: 'Iqbal',
      email: 'iqbalsaputra@gmail.com',
      password: '12345',
      notlp: '081387887675',
    },
    Users: [
      {
        $ref: '#/definitions/User',
      },
    ],
    PetugasDesa: {
      id: 1,
      nama: 'budi',
      email: 'budijati@gmail.com',
      password: '12345',
      notlp: '08909023035',
    },
    PetugasDesas: [
      {
        $ref: '#/definitions/PetugasDesa',
      },
    ],
    Admin: {
      id: 1,
      nama: 'budi',
      email: 'budijati@gmail.com',
      password: '12345',
    },
    Admins: [
      {
        $ref: '#/definitions/Admin',
      },
    ],

    Profile: {
      id: 'profile-id',
      name: 'user 1',
      email: 'user1@email.com',
      occupation: 'programmer',
      cover: 'cover.jpg',
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./app.js'); // Your project's root file
});
