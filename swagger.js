const { statistikjk, kebakaran } = require('./models/sqlite.database.js');

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
    PotensiDesa: {
      id: 1,
      nama: 'budi',
      deskrpsi: 'jl menjangan mas',
      alamat: '12345',
      foto: 'cover.jpg',
    },
    PotensiDesas: [
      {
        $ref: '#/definitions/PotensiDesa',
      },
    ],
    StatistikJk: {
      id: 1,
      laki_laki: '30',
      perempuan: '50',
    },
    StatistikJks: [
      {
        $ref: '#/definitions/StatistikJk',
      },
    ],
    StatistikPend: {
      id: 1,
      sd: '30',
      smp: '50',
      sma: '30',
      smk: '50',
      kuliah: '50',
    },
    StatistikPends: [
      {
        $ref: '#/definitions/StatistikPend',
      },
    ],
    StatistikPekerjaan: {
      id: 1,
      pns: '70',
      pegawai_swasta: '50',
      wirausaha: '30',
      tni: '50',
      polri: '50',
      buruh: '50',
      tidak_bekerja: '50',
    },
    StatistikPekerjaans: [
      {
        $ref: '#/definitions/StatistikPekerjaan',
      },
    ],
    StatistikAgama: {
      id: 1,
      islam: '70',
      kristen: '30',
      katholik: '30',
      hindu: '20',
      budha: '20',
      konghucu: '10',
      kepercayaan: '0',
    },
    StatistikAgamas: [
      {
        $ref: '#/definitions/StatistikAgama',
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
    PetugasKebakaran: {
      id: 1,
      nama: 'budi',
      email: 'budijati@gmail.com',
      password: '12345',
    },
    PetugasKebakarans: [
      {
        $ref: '#/definitions/PetugasKebaran',
      },
    ],
    Kebakaran: {
      id: 1,
      Judul: 'Banjir Bandang',
      lokasi: 'Jl Menjangan IV',
      deskripsi: 'Air Tidak Mengalir',
      tanggal: 'Selasa 26 Novber 2021',
      notlp: '081387887675',
      foto: 'cover.jpg',
    },
    Kebakarans: [
      {
        $ref: '#/definitions/Kebakaran',
      },
    ],
    Profile: {
      id: 'profile-id',
      name: 'user 1',
      email: 'user1@email.com',
      occupation: 'programmer',
      cover: 'cover.jpg',
    },
    PotensiDesa: {
      id: 1,
      name: 'situbungur',
      deskripsi: 'situbungur',
      alamat: 'menjangan',
      cover: 'cover.jpg',
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./app.js'); // Your project's root file
});
