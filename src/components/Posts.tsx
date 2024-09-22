export interface Post {
  id: string;
  title: string;
  description: string;
  body: string;
  date: Date;
  tags: string[];
}

export const posts: Post[] = [
  {
    id: "1",
    title: "Hello, world!",
    description: "Testing",
    date: new Date(),
    tags: ["demo"],
    body: `Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent metus faucibus nibh convallis volutpat ad, feugiat penatibus. Ultrices in morbi felis risus sapien. Porttitor finibus iaculis aenean egestas ultricies ac potenti. Senectus litora torquent maecenas condimentum consectetur. Amet aliquet ad varius scelerisque mollis quisque; torquent etiam. Diam finibus porta consequat cras orci integer quis. Vivamus phasellus accumsan praesent metus sagittis mollis enim. Ullamcorper facilisi facilisis felis justo urna.

Habitant at dictum mus aliquet dapibus elit. Faucibus maximus consequat quam hendrerit parturient himenaeos condimentum a. Imperdiet eu ornare eros penatibus sed conubia etiam egestas. Justo nec fermentum non augue eleifend primis mauris. Auctor aenean consectetur elementum justo adipiscing ante ultricies mus at. Magnis id consequat facilisis dictum interdum fermentum.

Praesent euismod eu lacus; leo nam suscipit vehicula purus vitae. Penatibus sed ligula luctus laoreet nam malesuada ligula vel. Vulputate in fringilla parturient nostra primis facilisi cras? Malesuada malesuada hendrerit in ornare blandit. Vivamus turpis habitasse malesuada volutpat eros volutpat quam potenti? Quis ut ultrices; non vulputate curabitur consequat. Nostra ante nascetur facilisis magnis suscipit vitae.

Consectetur dolor facilisi dis non tortor sociosqu lectus dignissim? Consectetur eu tellus adipiscing molestie nibh ridiculus mus massa. Et aliquam fringilla vulputate semper duis class. Praesent augue purus mus proin luctus. Fames luctus erat sociosqu maximus tellus. Laoreet arcu tempor malesuada gravida elit finibus condimentum. Ultrices ipsum mus pretium tempus semper fermentum vestibulum. Senectus pellentesque risus facilisis, donec morbi blandit. Turpis ad porttitor inceptos maecenas vulputate nascetur finibus vel. Aptent faucibus curae dictum massa tincidunt elementum faucibus gravida platea!

Pretium morbi sodales blandit, eleifend aliquam aptent euismod nibh. Scelerisque congue dapibus senectus curabitur platea. Praesent ornare magna lorem; felis sem nec. Phasellus bibendum auctor per ullamcorper aenean iaculis. Nulla volutpat maximus platea justo felis ullamcorper. Malesuada maximus vivamus gravida feugiat montes interdum habitant tempus. Sem habitant at tortor sociosqu nibh rutrum commodo facilisis adipiscing. Ridiculus netus praesent nec senectus a convallis tortor lectus odio! Molestie ultrices natoque massa taciti sapien tempor metus.`,
  },
  {
    id: "9",
    title: "On Red Gates",
    description: "... Coming soon!",
    date: new Date(),
    tags: ["management"],
    body: "Coming soon!",
  },
];
