import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { users } from '@qlik/api';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  userName: string = '';
  userEmail: string | undefined = '';
  constructor() {}

  async ngOnInit(): Promise<void> {
    users.getMyUser().then((res) => {
      this.userName = res.data?.name;
      this.userEmail = res.data?.email;
    });
  }
}
